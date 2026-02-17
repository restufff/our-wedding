"use server";

import fs from "fs/promises";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "comments.json");

export interface Comment {
    id: string;
    name: string;
    message: string;
    status: "Hadir" | "Tidak Hadir" | "Masih Bingung";
    createdAt: string;
}

export async function getComments(): Promise<Comment[]> {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or error reading, return empty array
        return [];
    }
}

export async function submitComment(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const status = formData.get("status") as "Hadir" | "Tidak Hadir" | "Masih Bingung";

    if (!name || !message || !status) {
        return { message: "Please fill in all fields" };
    }

    const newComment: Comment = {
        id: Date.now().toString(),
        name,
        message,
        status,
        createdAt: new Date().toISOString(),
    };

    try {
        const comments = await getComments();
        comments.push(newComment);
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(comments, null, 2));
        return { message: "Comment submitted successfully!", success: true };
    } catch (error) {
        return { message: "Failed to save comment" };
    }
}
