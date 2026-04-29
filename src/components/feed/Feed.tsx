import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string }) => {
    const { userId } = auth();

    let posts: any[] = [];

    if (username) {
        posts = await prisma.post.findMany({
            where: {
                user: {
                    username: username,
                },
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    //如果有username，说明是在个人主页的feed，就只展示这个用户的post
    //如果没有username，说明是在主页的feed，就展示所有关注的人和自己的post
    if (!username && userId) {
        const following = await prisma.follower.findMany({
            where: {
                followerId: userId,
            },
            select: {
                followingId: true,
            },
        });

        //获取所有关注的人和自己的id
        const followingIds = following.map((f) => f.followingId);
        //把自己的id也加进去，这样就能在主页feed看到自己的post了
        const ids = [userId, ...followingIds]

        posts = await prisma.post.findMany({
            where: {
                userId: {
                    in: ids,
                },
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
            {posts.length ? (posts.map(post => (
                <Post key={post.id} post={post} />
            ))) : "No posts found!"}
        </div>
    );
};

export default Feed;