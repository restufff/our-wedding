"use server";

import { supabase } from "@/lib/supabase";

export interface Comment {
    id: string;
    name: string;
    message: string;
    status: "Hadir" | "Tidak Hadir" | "Mungkin";
    createdAt: string;
}

export async function getComments(): Promise<Comment[]> {
    try {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching comments:", error);
            return [];
        }

        // Map database fields to interface (if needed, or just match schema)
        return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            message: item.message,
            status: item.status,
            createdAt: item.created_at
        }));
    } catch (error) {
        console.error("Unexpected error:", error);
        return [];
    }
}

export async function submitComment(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const status = formData.get("status") as "Hadir" | "Tidak Hadir" | "Mungkin";

    if (!name || !message || !status) {
        return { message: "Please fill in all fields" };
    }

    try {
        const { error } = await supabase
            .from('comments')
            .insert([
                {
                    name,
                    message,
                    status,
                    // created_at is automatically handled by default default now()
                }
            ]);

        if (error) {
            console.error("Supabase error:", error);
            return { message: "Failed to save comment" };
        }

        return { message: "Comment submitted successfully!", success: true };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { message: "Failed to save comment" };
    }
}
