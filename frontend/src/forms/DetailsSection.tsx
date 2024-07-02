import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const HotelsDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          type="text"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Region
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            type="text"
            {...register("region", { required: "This field is required" })}
          />
          {errors.region && (
            <span className="text-red-500">{errors.region.message}</span>
          )}
        </label>
      </div>
       <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
        rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
         
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
       <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
        min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          type="number"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
       <select {...register("starRating", {
        required: "This field is required"
       })} className="border rounded w-full p-2 text-gray-700 font-normal">
        <option value="" className=" text-sm font-bold">Select as Rating</option>
        {[1,2,3,4,5].map((num)=>(
            <option value={num}>{num}</option>
        ))}
       </select>
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
    </div>
  );
};

export default HotelsDetailsSection;
