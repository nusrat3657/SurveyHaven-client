import  { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaPencil } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';

const CreateSurvey = () => {
    const { user } = useContext(AuthContext);
    const { reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        name: user.displayName,
        email: user.email,
        title: '',
        price: '',
        description: '',
        options: 'yes',
        category: '',
        deadline: '',
        yesCount: 0,
        noCount: 0,
        totalVote: 0
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddSurvey = async (event) => {
        event.preventDefault();

        const surveyData = {
            ...formData,
            status: 'publish',
            date: new Date().toISOString(),
        };

        // console.log('Survey Created:', surveyData);

        const surveyRes = await axiosSecure.post('/surveys', surveyData);
        // console.log(surveyRes.data);
        if (surveyRes.data.insertedId) {
            reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Survey has been created successfully.',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div>
            <div className="mx-auto text-center md:w-4/12 my-5">
                <h3 className="text-2xl uppercase border-y-4 py-4">Create a Survey</h3>
            </div>
            <div>
                <form onSubmit={handleAddSurvey} className="bg-blue-400/30 p-8">
                    <div className="form-group mb-8">
                        <label className="label">
                            <span className="label-text font-bold">Survey Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
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
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add a Short Description"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    {/* <div className="form-group mb-8">
                        <label className="label">
                            <span className="label-text font-bold">Options</span>
                        </label>
                        <select
                            name="options"
                            value={formData.options}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div> */}
                    <div className="form-group mb-8">
                        <label className="label">
                            <span className="label-text font-bold">Category</span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
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
                            <span className="label-text font-bold">Price</span>
                        </label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Survey Price"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="form-group mb-8">
                        <label className="label">
                            <span className="label-text font-bold">Deadline</span>
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-block bg-blue-400/90 text-white text-lg py-2">
                        CREATE SURVEY <FaPencil />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateSurvey;





// import { useContext } from "react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../providers/AuthProvider";
// import { FaPencil } from "react-icons/fa6";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useForm } from "react-hook-form";

// // const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// // const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const CreateSurvey = () => {

//     const { user } = useContext(AuthContext);
//     const { reset } = useForm();
//     const axiosSecure = useAxiosSecure();

//     const handleAddSurvey = async (event) => {
//         event.preventDefault();

//         const form = event.target;

//         const name = form.name.value;
//         const email = form.email.value;
//         const title = form.title.value;
//         const deadline = form.deadline.value;
//         const category = form.category.value;
//         const price = form.price.value;
//         const currentVote = form.vote.value;
//         if (currentVote === 'Yes') {
//             parseInt(currentVote)
//         }
//         parseInt(currentVote)
//         const vote = currentVote;
//         const photo = form.photo.value;
//         const description = form.description.value;
//         const date = Date.now();
//         const status = 'publish';


//         const newSurvey = { name, email, title, deadline, category, price, vote, photo, description, date, status }
//         console.log(newSurvey);

//         const surveyRes = await axiosSecure.post('/surveys', newSurvey);
//         console.log(surveyRes.data);
//         if (surveyRes.data.insertedId) {
//             // show success popup
//             reset();
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: `${newSurvey.name} is created to the survey.`,
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//     }

//     return (
//         <div>
//             <div>
//                 <div className="mx-auto text-center md:w-4/12 my-5">
//                     <h3 className="text-2xl uppercase border-y-4 py-4">Create a Survey</h3>
//                 </div>
//                 <div>
//                     <form onSubmit={handleAddSurvey} className="bg-blue-400/30 p-8" >
//                         <div className="md:flex mb-8">
//                             <div className="form-control md:w-1/2">
//                                 <label className="label">
//                                     <span className="label-text  font-bold">Name</span>
//                                 </label>
//                                 <label className="input-group">
//                                     <input type="text" name="name" placeholder="User Name" value={user?.displayName} className="input input-bordered w-full" disabled />
//                                 </label>

//                             </div>
//                             <div className="form-control md:w-1/2 md:ml-4">
//                                 <label className="label">
//                                     <span className="label-text font-bold">Email</span>
//                                 </label>
//                                 <label className="input-group">
//                                     <input type="text" name="email" placeholder="User Email" value={user?.email} disabled className="input input-bordered w-full" />
//                                 </label>

//                             </div>
//                         </div>
//                         {/* form row */}
//                         <div className="md:flex mb-8">
//                             <div className="form-control md:w-1/2">
//                                 <label className="label">
//                                     <span className="label-text  font-bold">Survey Title</span>
//                                 </label>
//                                 <label className="input-group">
//                                     <input type="text"
//                                         placeholder="Survey Title"
//                                         name="title"
//                                         className="input input-bordered w-full" />
//                                 </label>

//                             </div>
//                             <div className="form-control md:w-1/2 md:ml-4">
//                                 <label className="label">
//                                     <span className="label-text font-bold">Deadline</span>
//                                 </label>
//                                 <label className="input-group">
//                                     <input type="date" name="deadline" placeholder="" className="input input-bordered w-full" />
//                                 </label>

//                             </div>

//                         </div>
//                         {/* form row */}
//                         <div className="md:flex mb-8">

//                             <div className="form-control md:w-1/2 ">
//                                 <label className="label">
//                                     <span className="label-text font-bold">Category</span>
//                                 </label>
//                                 <label className="input-group">
//                                     <select defaultValue="default" className="select select-bordered w-full" name="category">
//                                         <option disabled value="default">Choose your Category</option>
//                                         <option>Customer Service</option>
//                                         <option>Product</option>
//                                         <option>Website</option>
//                                         <option>Employee</option>
//                                         <option >Event</option>
//                                         <option>Training</option>
//                                         <option>Community</option>
//                                         <option>Mobile App</option>
//                                         <option>Support</option>
//                                     </select>
//                                 </label>

//                             </div>
//                             <div className="form-control md:w-1/2 md:ml-4">
//                                 <label className="label">
//                                     <span className="label-text font-bold">Price</span>
//                                 </label>
//                                 <label className="input-group">
//                                     <input type="text" name="price" placeholder="" className="input input-bordered w-full" />
//                                 </label>

//                             </div>
//                         </div>
//                         {/* form row */}
//                         <div className="md:flex mb-8">
//                             <div className="form-control md:w-1/2">
//                                 <label className="label">
//                                     <span className="label-text font-bold">Vote (are you like the survey?)</span>
//                                 </label>
//                                 <label className="input-group">
//                                     <select className="select select-bordered w-full " name="vote">
//                                         <option disabled selected>Yes/No</option>
//                                         <option value="yes">Yes</option>
//                                         <option value="no">No</option>
//                                     </select>
//                                 </label>

//                             </div>
//                             <div className="form-control md:w-1/2 md:ml-4">
//                                 <label className="label">
//                                     <span className="label-text font-bold">Survey Image</span>
//                                 </label>
//                                 <label className="input-group">
//                                     <input type="text" name="photo" placeholder="Survey URL" className="input input-bordered w-full" />
//                                 </label>

//                             </div>
//                         </div>
//                         {/* form row */}
//                         <div className="mb-8">
//                             <div className="form-control md:w-full">
//                                 <label className="label">
//                                     <span className="label-text font-bold">Description</span>
//                                 </label>
//                                 <label className="input-group">
//                                     <textarea type="text" name="description" placeholder="Add a Short Description" className="input input-bordered w-full h-20 p-2" />
//                                 </label>

//                             </div>
//                         </div>

//                         <button className="btn btn-block bg-blue-400/90 text-white text-lg py-2">
//                             CREATE SURVEY<FaPencil></FaPencil>
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateSurvey;






//  import { useContext, useEffect } from "react";
//  import { useForm } from "react-hook-form";
//  import { AuthContext } from "../../../providers/AuthProvider";
//  import useAxiosPublic from "../../../hooks/useAxiosPublic";
//  import { FaPencil } from "react-icons/fa6";
//
//  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
//  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const CreateSurvey = () => {
//     const { user } = useContext(AuthContext);
//     const { register, handleSubmit } = useForm();
//     const axiosPublic = useAxiosPublic();

//     const onSubmit = async (data) => {
//         console.log('form submitted', data);
//         // image upload to imgbb and then get an url
//         const imageFile = { image: data.image[0] }
//         const res = await axiosPublic.post(image_hosting_api, imageFile, {
//             headers: {
//                 'content-type': 'multipart/form-date'
//             }
//         });
//         console.log(res.data);
//     }

//     useEffect(() => {
//         console.log('Component Mounted');
//         console.log('Image Hosting Key:', image_hosting_key);
//     }, []);

//     useEffect(() => {
//         console.log('Axios Instance:', axiosPublic);
//     }, [axiosPublic]);

//     return (
//         <div>
//             <div className="mx-auto text-center md:w-4/12 my-5">
//                 <h3 className="text-2xl uppercase border-y-4 py-4">Create a Survey</h3>
//             </div>
//             <div>
//                 <form onSubmit={handleSubmit(onSubmit)} className="bg-blue-400/30 p-8" >
//                     <div className="md:flex mb-8">
//                         <div className="form-control md:w-1/2">
//                             <label className="label">
//                                 <span className="label-text  font-bold">Name</span>
//                             </label>
//                             <label className="input-group">
//                                 <input type="text" {...register('name', { required: true })} placeholder="User Name" value={user?.displayName} className="input input-bordered w-full" disabled />
//                             </label>

//                         </div>
//                         <div className="form-control md:w-1/2 md:ml-4">
//                             <label className="label">
//                                 <span className="label-text font-bold">Email</span>
//                             </label>
//                             <label className="input-group">
//                                 <input type="text" {...register('email', { required: true })} placeholder="User Email" value={user?.email} disabled className="input input-bordered w-full" />
//                             </label>

//                         </div>
//                     </div>
//                     {/* form row */}
//                     <div className="md:flex mb-8">
//                         <div className="form-control md:w-1/2">
//                             <label className="label">
//                                 <span className="label-text  font-bold">Survey Title</span>
//                             </label>
//                             <label className="input-group">
//                                 <input type="text"
//                                     placeholder="Survey Title"
//                                     {...register('title', { required: true })}
//                                     className="input input-bordered w-full" />
//                             </label>

//                         </div>
//                         <div className="form-control md:w-1/2 md:ml-4">
//                             <label className="label">
//                                 <span className="label-text font-bold">Deadline</span>
//                             </label>
//                             <label className="input-group">
//                                 <input type="date" {...register('deadline', { required: true })} placeholder="Food Origin(country)" className="input input-bordered w-full" />
//                             </label>

//                         </div>

//                     </div>
//                     {/* form row */}
//                     <div className="md:flex mb-8">

//                         <div className="form-control md:w-1/2 ">
//                             <label className="label">
//                                 <span className="label-text font-bold">Category</span>
//                             </label>
//                             <label className="input-group">
//                                 <select defaultValue="default" className="select select-bordered w-full" {...register("category", { required: true })}>
//                                     <option disabled value="default">Choose your Category</option>
//                                     <option value="service">Customer Service</option>
//                                     <option value="product">Product</option>
//                                     <option value="website">Website</option>
//                                     <option value="employee">Employee</option>
//                                     <option value="event">Event</option>
//                                     <option value="training">Training</option>
//                                     <option value="community">Community</option>
//                                     <option value="mobile">Mobile App</option>
//                                     <option value="support">Support</option>
//                                 </select>
//                             </label>

//                         </div>
//                         <div className="form-control md:w-1/2 md:ml-4">
//                             <label className="label">
//                                 <span className="label-text font-bold">Price</span>
//                             </label>
//                             <label className="input-group">
//                                 <input type="text" {...register('price', { required: true })} placeholder="" className="input input-bordered w-full" />
//                             </label>

//                         </div>
//                     </div>
//                     {/* form row */}
//                     <div className="md:flex mb-8">
//                         <div className="form-control md:w-1/2">
//                             <label className="label">
//                                 <span className="label-text font-bold">Vote (are you like the survey?)</span>
//                             </label>
//                             <label className="input-group">
//                                 <select className="select select-bordered w-full " {...register("vote", { required: true })}>
//                                     <option disabled selected>Yes/No</option>
//                                     <option value="yes">Yes</option>
//                                     <option value="no">No</option>
//                                 </select>
//                             </label>

//                         </div>
//                         <div className="form-control md:w-1/2 md:ml-4">
//                             <label className="label">
//                                 <span className="label-text font-bold">Image</span>
//                             </label>
//                             <div>
//                                 <input type="file" {...register("photo", { required: true })} className="file-input file-input-bordered w-full " />
//                             </div>

//                         </div>
//                     </div>
//                     {/* form row */}
//                     <div className="mb-8">
//                         <div className="form-control md:w-full">
//                             <label className="label">
//                                 <span className="label-text font-bold">Description</span>
//                             </label>
//                             <label className="input-group">
//                                 <textarea type="text" {...register("description")} placeholder="Add a Short Description" className="input input-bordered w-full h-20 p-2" />
//                             </label>

//                         </div>
//                     </div>

//                     <button className="btn btn-block bg-blue-400/90 text-white text-lg py-2">
//                         CREATE SURVEY<FaPencil></FaPencil>
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateSurvey;