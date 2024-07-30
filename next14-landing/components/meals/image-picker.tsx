"use client"

import classes from "./image-picker.module.css";
import {ChangeEvent, useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}: {label: string, name: string}) {
    const [pickedImage, setPickedImage] = useState<null|string>(null);
    const imageInputRef = useRef<HTMLInputElement|null>(null);

    function handlePickerClick() {
        imageInputRef.current?.click();
    }

    function handleImageChanged(event: ChangeEvent) {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (files && files.length) {
            const file = files[0];
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPickedImage(fileReader.result?.toString() || null);
            }
            fileReader.readAsDataURL(file);
        } else {
            setPickedImage(null);
            return;
        }
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill />}
                </div>
                <input type="file" id={name} accept="image/*" className={classes.input} name={name} ref={imageInputRef} required onChange={handleImageChanged} />
                <button className={classes.button} type="button" onClick={handlePickerClick}>Pick an Image</button>
            </div>
        </div>
    )
}
