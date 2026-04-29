import FriendRequests from "./FriendRequests"
import Brithdays from "./Brithdays"
import Ad from "../Ad"
import UserinfoCard from "./UserinfoCard"
import UserMediaCard from "./UserMediaCard"
import { User } from "@prisma/client"
import { Suspense } from "react"

const RightMenu = ({ user }: { user?: User }) => {
    return (
        <div className='flex flex-col gap-6'>
            {user ? (<>
                <Suspense fallback="Loading...">
                    <UserinfoCard user={user} />
                </Suspense>
                <Suspense fallback="Loading...">
                    <UserMediaCard user={user} />
                </Suspense>
            </>) : null}
            <FriendRequests />
            <Brithdays />
            <Ad size="md" />
        </div>
    )
}

export default RightMenu