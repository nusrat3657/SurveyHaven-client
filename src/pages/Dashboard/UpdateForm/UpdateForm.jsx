import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [survey, setSurvey] = useState(null);
    console.log(survey);

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

    const categories = [
        'Customer Service',
        'Product',
        'Website',
        'Employee',
        'Event',
        'Training',
        'Community',
        'Mobile App',
        'Support'
    ];

    const handleUpdate = async (event) => {
        event.preventDefault();
        const form = event.target;

        const name = survey.name;
        const email = survey.email;
        const title = form.title.value;
        const description = form.description.value;
        const options = form.options.value;
        const category = form.category.value;
        const deadline = form.deadline.value;
        const price = survey.price;
        const yesCount = survey.yesCount;
        const noCount = survey.noCount;
        const totalVote = survey.totalVote;
        const status = survey.status;
        const date = survey.date;

        const updatedSurvey = { name, email, title, description, options, category, deadline, price, yesCount, noCount, totalVote, status, date };
        console.log(updatedSurvey);

        // send data to the server
        try {
            const surveyRes = await axiosSecure.put(`/surveys/${survey._id}`, updatedSurvey);
            if (surveyRes.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    title: "Success!",
                    text: "Survey Updated Successfully",
                    icon: "success",
                    confirmButtonText: 'Cool'
                });
            }
        } catch (error) {
            console.error('Error updating survey:', error);
        }
    };

    if (!survey) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="mx-auto text-center md:w-4/12 my-5">
                <h3 className="text-2xl uppercase border-y-4 py-4">Update a Survey</h3>
            </div>
            <div>
                <form onSubmit={handleUpdate} className="bg-blue-400/30 p-8">
                    <div className="form-group mb-8">
                        <label className="label">
                            <span className="label-text font-bold">Survey Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={survey.title}
                            placeholder="Survey Title"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-group mb-8">
                        <label className="label">
                            <span className="label-text font-bold">Description</span>
                        </label>
                        <textarea
                            name="description"
                            defaultValue={survey.description}
                            placeholder="Add a Short Description"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-group mb-8">
                        <label className="label">
                            <span className="label-text font-bold">Options</span>
                        </label>
                        <select
                            name="options"
                            defaultValue={survey.options}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                    </div>
                    <div className="form-group mb-8">
                        <label className="label">
                            <span className="label-text font-bold">Category</span>
                        </label>
                        <select
                            name="category"
                            defaultValue={survey.category}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-8">
                        <label className="label">
                            <span className="label-text font-bold">Deadline</span>
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            defaultValue={survey.deadline}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-block bg-blue-400/90 text-white text-lg py-2">
                        UPDATE SURVEY <FaEdit />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;
