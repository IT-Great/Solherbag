import axios from "axios";
import { BASE_URL } from "../config/api";

export const uploadToS3 = async (file, folder) => {

    const presign = await axios.post(
        `${BASE_URL}/s3/presign`,
        {
            filename: file.name,
            folder,
        }
    );

    const { upload_url, file_url } = presign.data;

    await axios.put(upload_url, file, {
        headers: {
            "Content-Type": file.type,
        },
    });

    return file_url;
};