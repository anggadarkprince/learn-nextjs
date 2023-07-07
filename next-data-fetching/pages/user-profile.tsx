import {PropsWithoutRef} from "react";
import {GetServerSideProps} from "next";

function UserProfilePage(props: PropsWithoutRef<any>) {
    return <h1>{props.username}</h1>
}

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {params, req, res} = context;
    return {
        props: {
            username: 'Max'
        }
    }
}