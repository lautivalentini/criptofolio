import Router from "next/router";

export async function useUser(redirectTo: string, redirectIfFound: boolean) {
    const response = await fetch("/api/user");
    const data = await response.json();

    const user = data?.user;
    const finished = Boolean(data);
    const hasUser = Boolean(user);

    if (!redirectTo || !finished) return;
    if (
        // If redirectTo is set, redirect if the user was not found.
        (redirectTo && !redirectIfFound && !hasUser) ||
        // If redirectIfFound is also set, redirect if the user was found
        (redirectIfFound && hasUser)
    ) {
        Router.push(redirectTo);
    }

    return user ? user : null;
}
