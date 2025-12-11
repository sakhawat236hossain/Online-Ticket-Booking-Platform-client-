// import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { uploadImageToImgBB } from "../../../../Utils";
import UseAuth from "../../../../Hooks/UseAuth";
import { useAddTicket } from "../../../../Hooks/useAddTicket";
import Swal from "sweetalert2";

const AddTicket = () => {
  const { user } = UseAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // React Query Mutation
  const { mutateAsync, isPending } = useAddTicket();

  const onSubmit = async (data) => {
    try {
      const imageUrl = await uploadImageToImgBB(data.image[0]);
      const departureDate = new Date(data.departure).toISOString();

      const ticketInfo = {
        title: data.title,
        from: data.from,
        to: data.to,
        transport: data.transport,
        price: Number(data.price),
        quantity: Number(data.quantity),
        departure: departureDate,
        perks: data.perks || [],
        image: imageUrl,
        status: "pending",
        Vendor: {
          VendorName: user?.displayName,
          VendorEmail: user?.email,
          VendorImage: user?.photoURL,
        },
      };

      //  Send data 
      await mutateAsync(ticketInfo);

      reset();
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Ticket added successfully!",
  showConfirmButton: false,
  timer: 1500
});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-5 border">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Add New Ticket
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* TITLE */}
        <div>
          <label className="font-semibold block mb-1">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* FROM / TO */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">From</label>
            <input
              {...register("from", { required: "From location is required" })}
              placeholder="From"
              className="input input-bordered w-full"
            />
            {errors.from && <p className="text-red-500 text-sm">{errors.from.message}</p>}
          </div>

          <div>
            <label className="font-semibold block mb-1">To</label>
            <input
              {...register("to", { required: "Destination is required" })}
              placeholder="To"
              className="input input-bordered w-full"
            />
            {errors.to && <p className="text-red-500 text-sm">{errors.to.message}</p>}
          </div>
        </div>

        {/* TRANSPORT */}
        <div>
          <label className="font-semibold block mb-1">Transport</label>
          <select
            {...register("transport", { required: "Select a transport type" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Transport</option>
            <option>Bus</option>
            <option>Train</option>
            <option>Air</option>
            <option>Ship</option>
            <option>Car</option>
          </select>
          {errors.transport && <p className="text-red-500 text-sm">{errors.transport.message}</p>}
        </div>

        {/* PRICE / QUANTITY */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold block mb-1">Price</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" }
              })}
              placeholder="Price"
              className="input input-bordered w-full"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="font-semibold block mb-1">Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" }
              })}
              placeholder="Quantity"
              className="input input-bordered w-full"
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
          </div>
        </div>

        {/* CUSTOM DATE INPUT */}
        <div>
         <label className="font-semibold block mb-1">
  Departure Time (YYYY-MM-DD HH:mm)
</label>
          <input
            type="text"
            {...register("departure", {
              required: "Departure time is required",
              validate: (value) =>
                !isNaN(new Date(value).getTime()) || "Invalid date format",
            })}
            placeholder="Enter departure date (e.g. 2025-12-25 14:30)"
            className="input input-bordered w-full"
          />
          {errors.departure && (
            <p className="text-red-500 text-sm">{errors.departure.message}</p>
          )}
        </div>

        {/* PERKS */}
        <div>
          <label className="font-semibold block mb-1">Perks</label>
          {["AC", "WiFi", "Breakfast", "TV"].map((p) => (
            <label key={p} className="mr-4">
              <input type="checkbox" {...register("perks")} value={p} /> {p}
            </label>
          ))}
        </div>

        {/* IMAGE */}
        <div>
          <label className="font-semibold block mb-1">Upload Image</label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="file-input w-full"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        <button 
          type="submit" 
          className="btn btn-error w-full text-white"
          disabled={isPending}
        >
          {isPending ? "Adding..." : <>
            <FiPlusCircle /> Add Ticket
          </>}
        </button>

      </form>
    </div>
  );
};

export default AddTicket;
