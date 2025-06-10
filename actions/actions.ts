"use server";
import { cookies } from "next/headers";

const baseUrl = process.env.BASE_URL || "https://tempmail-api-free.p.rapidapi.com";
const x_rapidapi_key = process.env.X_RAPIDAPI_KEY || "50c9c3f974msh08092f88f044eedp10a9f2jsnfaf6222bc9c6";
const x_rapidapi_host = process.env.X_RAPIDAPI_HOST || "tempmail-api-free.p.rapidapi.com";

interface Email {
    id: string;
    from: string;
    to: string;
    cc: string;
    subject: string;
    body_text: string;
    body_html: string;
    created_at: string;
    isRead: boolean;
    isUnread?: boolean;
}

export const getcurrentEmail = async () => {
    try {
        const currentemail = (await cookies()).get("currentemail");
        if (!currentemail) {
            const newemail = await registerEmail();
            return newemail;
        }
        return currentemail!.value;
    } catch (error) {
        console.error("Error fetching current email:", error);
        throw new Error("Failed to fetch current email");
    }
}

export const registerEmail = async (name: string = Math.random().toString(36).substring(2, 8)) => {
    try {
        const domains = await getDomains();
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const response = await fetch(`${baseUrl}/api/v3/email/new`, {
            method: 'POST',
            headers: {
                'x-rapidapi-key': x_rapidapi_key,
                'x-rapidapi-host': x_rapidapi_host,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                domain: randomDomain.name
            })
        }
        );
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
            throw new Error("Failed to register email");
        }

        if (!data.email) {
            throw new Error("No email returned from API");
        }
        const currentemail = data.email;
        const currenttoken = data.token;
        const cookieStore = await cookies();
        cookieStore.set("currentemail", currentemail);
        cookieStore.set("currenttoken", currenttoken);
        return currentemail;
    } catch (error) {
        console.error("Error registering email:", error);
        throw new Error("Failed to register email");
    }
}

export const deletecurrentEmail = async () => {
    try {
        const currentemail = (await cookies()).get("currentemail");
        const currenttoken = (await cookies()).get("currenttoken");
        if (!currentemail || !currenttoken) {
            throw new Error("No current email or token found");
        }
        const response = await fetch(`${baseUrl}/api/v3/email/${currentemail.value}`, {
            method: 'DELETE',
            headers: {
                'x-rapidapi-key': x_rapidapi_key,
                'x-rapidapi-host': x_rapidapi_host,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: currenttoken.value
            })
        }
        );
        if (!response.ok) {
            throw new Error("Failed to delete email");
        }
        const cookieStore = await cookies();
        cookieStore.delete("currentemail");
        cookieStore.delete("currenttoken");
        return true;
    } catch (error) {
        const cookieStore = await cookies();
        cookieStore.delete("currentemail");
        cookieStore.delete("currenttoken");
        return true;
    }
}

export const getEmails = async (email: string) => {
    try {
        const response = await fetch(`${baseUrl}/api/v3/email/${email}/messages`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': x_rapidapi_key,
                'x-rapidapi-host': x_rapidapi_host
            }
        });
        let data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error("Failed to fetch emails");
        }


        if (!data || data.length === 0) {
            throw new Error("No emails found");
        }
        // data = data.map((email: Email) => ({
        //     ...email,
        //     isUnread: true,
        // }));
        data.sort((a: Email, b: Email) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        return data;
    } catch (error) {
        console.error("Error fetching emails:", error);
        throw new Error("Failed to fetch emails");
    }
}

export const getDomains = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/v3/domains`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': x_rapidapi_key,
                'x-rapidapi-host': x_rapidapi_host
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch domains");
        }

        const data = await response.json();
        if (!data.domains || data.domains.length === 0) {
            throw new Error("No domains found");
        }
        return data.domains;
    } catch (error) {
        console.error("Error fetching domains:", error);
        throw new Error("Failed to fetch domains");
    }
}
