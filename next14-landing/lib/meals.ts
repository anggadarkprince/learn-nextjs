import sql from 'better-sqlite3';
import {Meal, MealFormData} from "@/types";
import slugify from "slugify";
import xss from "xss";
import * as fs from "node:fs";
import {GetObjectCommand, PutObjectCommand, S3} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

const s3 = new S3({
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
    },
    region: process.env.S3_DEFAULT_REGION
});

const db = sql('meals.db');

export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return db.prepare<unknown[], Meal>('SELECT * FROM meals').all();
}

export async function getMeal(slug: string) {
    return db.prepare<string[], Meal>('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal: MealFormData) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    if (meal.image instanceof File) {
        const extension = meal.image.name.split('.').pop();
        const fileName = `${meal.slug}-${Date.now()}.${extension}`;

        const stream = fs.createWriteStream(`public/images/${fileName}`);
        const bufferedImage = await meal.image.arrayBuffer();

        /*stream.write(Buffer.from(bufferedImage), (error) => {
            if (error) {
                throw new Error('Saving image failed');
            }
        });*/

        await s3.putObject({
            Bucket: process.env.S3_BUCKET,
            Key: `images/${fileName}`,
            Body: Buffer.from(bufferedImage),
            ContentType: meal.image.type,
        });

        meal.image = `images/${fileName}`;
    }

    db.prepare(`
        INSERT INTO meals(title, summary, instructions, creator, creator_email, image, slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);
}

export async function getImageUrl(path: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: path
    });

    return await getSignedUrl(s3, command, {expiresIn: 360});
}
