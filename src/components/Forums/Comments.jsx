import { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router";

const Comments = ({ comment, profile, writeDate }) => {
    
    
    return (
        <div className="bordered padded margined no-center-text comment">
            <div className="top-box">
                <div>
                    <sup className="go-right">
                        {writeDate(
                            'Posted',
                            comment?.datePosted,
                            comment?.dateUpdated
                        )}
                    </sup>
                    <div className="av-box bordered author go-left">
                        <Link to={(`/profiles/${profile?.displayName}/${profile?._id}`)}>
                            <div>
                                <h4>
                                    <img className="avatar" src={profile?.avatar} />
                                    {profile?.displayName}
                                </h4>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {comment?.body}
            {(comment?.linkedImages)?(
                <>
                    {comment?.linkedImages?.map(imgURL => (
                        <>{imgURL?(<img key={imgURL} src={imgURL}/>):(null)}</>
                    ))}
                </>
            ):(
                <></>
            )}
        </div>
    )
}

export default Comments