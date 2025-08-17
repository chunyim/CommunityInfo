import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // removes spaces before/after
    },
    category: {
      type: String,
      required: true,
      enum: [
        "legal services",
        "mental health support",
        "tax clinic",
        "help with application",
        "food banks",
        "employment agency",
        "free clothing",
        "itinerary services in WPESS",
        "emergency shelters",
        "clinics for uninsured",
        "others",
      ],
    },
    serviceProvider: {
      type: String,
      default: null,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    phoneContact: {
      type: String,
      default: null,
    },
    webOrEmailContact: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;




//1 - create a schema
//2 - create a model based on the schema
//3 - export the model
