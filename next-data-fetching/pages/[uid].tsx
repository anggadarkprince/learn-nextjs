import {GetServerSideProps} from "next";

function UserIdPage(props: {id: string}) {
    return <h1>{props.id}</h1>
}

export default UserIdPage;

export const getServerSideProps: GetServerSideProps<{id: string}> = async (context) => {
    const {params} = context;
    const userId = params?.uid as string;
    console.log('userId', userId);
    return {
        props: {
            id: 'userid-' + userId,
        }
    }
}