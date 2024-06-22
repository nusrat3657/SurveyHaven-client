import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
// import { Bar } from 'react-chartjs-2';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isProUser } = useContext(AuthContext);
    const [survey, setSurvey] = useState(null);
    const [vote, setVote] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const response = await axiosSecure.get(`/surveys/${id}`);
                setSurvey(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSurvey();
    }, [id, axiosSecure]);

    const handleVote = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosSecure.post(`/surveys/${id}/vote`, { vote });
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Vote submitted',
                });
                setSurvey(response.data.updatedSurvey);
            }
        } catch (error) {
            console.error('Error submitting vote:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to submit vote. Please try again later.',
            });
        }
    };

    const handleReport = async () => {
        try {
            const response = await axiosSecure.post(`/surveys/${id}/report`);
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Reported successfully',
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddComment = async () => {
        try {
            const response = await axiosSecure.post(`/surveys/${id}/comments`, { comment: newComment });
            setComments([...comments, response.data.comment]);
            setNewComment('');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add comment. Please try again later.',
            });
        }
    };

    if (!survey) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: ['Yes', 'No'],
        datasets: [
            {
                label: 'Votes',
                data: [survey.votes?.yes ?? 0, survey.votes?.no ?? 0],
                backgroundColor: ['#4caf50', '#f44336'],
            },
        ],
    };

    return (
        <div>
            <Helmet>
                <title>SurveyHaven | Details</title>
            </Helmet>
            <div className="relative w-full h-[250px]  my-5">
                <img src="https://i.ibb.co/w7Hd4rY/businessman-hands-using-cell-phone-with-financial-report-graph.jpg" className="w-full h-[280px]" />
                <div className="absolute items-center w-full h-[280px] left-0 top-0 bg-gradient-to-r from-[#151515]/70 to-[#151515]/0">
                    <div className="text-white pl-12 text-center mt-24">
                        <h2 className="text-6xl font-bold mb-2">Surveys</h2>
                    </div>
                </div>
            </div>
            <div>
                <h2>{survey.title}</h2>
                <p>{survey.description}</p>

                {user ? (
                    <form onSubmit={handleVote}>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="vote"
                                    value="yes"
                                    checked={vote === 'yes'}
                                    onChange={(e) => setVote(e.target.value)}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="vote"
                                    value="no"
                                    checked={vote === 'no'}
                                    onChange={(e) => setVote(e.target.value)}
                                />
                                No
                            </label>
                        </div>
                        <button type="submit">Submit Vote</button>
                    </form>
                ) : (
                    <p>Please log in to vote.</p>
                )}

                {isProUser && (
                    <div>
                        <h3>Comments</h3>
                        <ul>
                            {comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment"
                        />
                        <button onClick={handleAddComment}>Add Comment</button>
                    </div>
                )}

                <div>
                    <h3>Results</h3>
                    {/* <Bar data={data} /> */}
                </div>

                <button onClick={handleReport}>Report Survey</button>
            </div>
        </div>
    );
};

export default Details;









// import { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../providers/AuthProvider';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { Helmet } from 'react-helmet-async';

// const Details = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { user, isProUser } = useContext(AuthContext);
//     const [survey, setSurvey] = useState({ title: '', description: '', votes: { yes: 0, no: 0 } });
//     const [vote, setVote] = useState('');
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         const fetchSurvey = async () => {
//             try {
//                 const response = await axiosSecure.get(`/surveys/${id}`);
//                 setSurvey(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchSurvey();
//     }, [id, axiosSecure]);

//     const handleVote = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axiosSecure.post(`/surveys/${id}/vote`, { vote });
//             if (response.data.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Vote submitted',
//                 });
//                 setSurvey(response.data.updatedSurvey);
//             }
//         } catch (error) {
//             console.error('Error submitting vote:', error);
//             if (error.response) {
//                 // Server responded with a status code outside of 2xx range
//                 console.error('Response data:', error.response.data);
//                 console.error('Response status:', error.response.status);
//                 // Handle specific errors based on status code if needed
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.error('No response received:', error.request);
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.error('Error setting up request:', error.message);
//             }
//             // Display user-friendly message about the error
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error!',
//                 text: 'Failed to submit vote. Please try again later.',
//             });
//         }
//     };

//     const handleReport = async () => {
//         try {
//             const response = await axiosSecure.post(`/surveys/${id}/report`);
//             if (response.data.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Reported successfully',
//                 });
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     if (!survey) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <Helmet>
//                 <title>SurveyHaven | Details</title>
//             </Helmet>
//             <div className="relative w-full h-[250px]  my-5">
//                 <img src="https://i.ibb.co/w7Hd4rY/businessman-hands-using-cell-phone-with-financial-report-graph.jpg" className="w-full h-[280px]" />
//                 <div className="absolute items-center w-full h-[280px] left-0 top-0 bg-gradient-to-r from-[#151515]/70 to-[#151515]/0">
//                     <div className="text-white pl-12 text-center mt-24">
//                         <h2 className="text-6xl font-bold mb-2">Surveys</h2>
//                     </div>
//                 </div>
//             </div>
//             <div>
//             <h2>{survey.title}</h2>
//             <p>{survey.description}</p>

//             {user ? (
//                 <form onSubmit={handleVote}>
//                     <div>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="vote"
//                                 value="yes"
//                                 checked={vote === 'yes'}
//                                 onChange={(e) => setVote(e.target.value)}
//                             />
//                             Yes
//                         </label>
//                         <label>
//                             <input
//                                 type="radio"
//                                 name="vote"
//                                 value="no"
//                                 checked={vote === 'no'}
//                                 onChange={(e) => setVote(e.target.value)}
//                             />
//                             No
//                         </label>
//                     </div>
//                     <button type="submit">Submit Vote</button>
//                 </form>
//             ) : (
//                 <p>Please log in to vote.</p>
//             )}

//             {isProUser && (
//                 <div>
//                     <h3>Comments</h3>
//                     {/* Comment form and list */}
//                 </div>
//             )}

//             <div>
//                 <h3>Results</h3>
//                 <p>Yes: {survey.votes?.yes ?? 0}</p>
//                 <p>No: {survey.votes?.no ?? 0}</p>
//             </div>

//             <button onClick={handleReport}>Report Survey</button>
//             </div>
//         </div>
//     );
// };

// export default Details;
