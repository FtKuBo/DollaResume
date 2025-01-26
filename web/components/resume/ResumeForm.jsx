import { useState } from "react";
import { useActionForm } from "@gadgetinc/react";
import { api } from "../../api";
import "./ResumeForm.css";

export default function ResumeForm({ onSubmit, isLoading, aiLoading, error: parentError, initialData }) {
  const [educationFields, setEducationFields] = useState(initialData?.education || [{ degree: "", institution: "", graduation: "" }]);
  const [experienceFields, setExperienceFields] = useState(initialData?.experience?.map(exp => ({
    title: exp.title || "",
    company: exp.company || "",
    duration: exp.duration || (exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ""),
    description: exp.description || ""
  })) || [{ title: "", company: "", duration: "", description: "" }]);
  const [projectFields, setProjectFields] = useState(initialData?.projects || [{ name: "", description: "", url: "" }]);
  const [links, setLinks] = useState(initialData?.links || [""]);
  const [skills, setSkills] = useState(initialData?.skills || [""]);

  const { formState: { errors } } = useActionForm(api.resumes.create);

  const addField = (array, setArray, template) => {
    setArray([...array, template]);
  };

  const removeField = (array, setArray, index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  const updateField = (array, setArray, index, key, value) => {
    const newArray = [...array];
    newArray[index][key] = value;
    setArray(newArray);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      education: educationFields,
      experience: experienceFields,
      projects: projectFields,
      links,
      skills,
    };
    await onSubmit(formData);
  };

  return (
    <form className="resume-form" onSubmit={handleFormSubmit}>
      {(parentError || Object.keys(errors).length > 0) && (
        <div className="resume-form__error">
          {parentError && "Please check the form for errors"}
          {Object.entries(errors).map(([field, error]) => (
            <div key={field}>{error.message}</div>
          ))}
        </div>
      )}

      <div className="resume-form__section">
        <h3>Education</h3>
        {educationFields.map((field, index) => (
          <div key={index} className="resume-form__entry">
            <input
              type="text"
              className="resume-form__input"
              placeholder="Degree"
              value={field.degree}
              onChange={(e) => updateField(educationFields, setEducationFields, index, "degree", e.target.value)}
            />
            <input
              type="text"
              className="resume-form__input"
              placeholder="Institution"
              value={field.institution}
              onChange={(e) => updateField(educationFields, setEducationFields, index, "institution", e.target.value)}
            />
            <input
              type="text"
              className="resume-form__input"
              placeholder="Graduation Date"
              value={field.graduation}
              onChange={(e) => updateField(educationFields, setEducationFields, index, "graduation", e.target.value)}
            />
            {index > 0 && (
              <button
                type="button"
                className="resume-form__button resume-form__button--remove"
                onClick={() => removeField(educationFields, setEducationFields, index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="resume-form__button resume-form__button--add"
          onClick={() => addField(educationFields, setEducationFields, { degree: "", institution: "", graduation: "" })}
        >
          Add Education
        </button>
      </div>

      <div className="resume-form__section">
        <h3>Experience</h3>
        {experienceFields.map((field, index) => (
          <div key={index} className="resume-form__entry">
            <input
              type="text"
              className="resume-form__input"
              placeholder="Title"
              value={field.title}
              onChange={(e) => updateField(experienceFields, setExperienceFields, index, "title", e.target.value)}
            />
            <input
              type="text"
              className="resume-form__input"
              placeholder="Company"
              value={field.company}
              onChange={(e) => updateField(experienceFields, setExperienceFields, index, "company", e.target.value)}
            />
            <input
              type="text"
              className="resume-form__input"
              placeholder="Duration (e.g. June 2024 - August 2024)"
              value={field.duration}
              onChange={(e) => updateField(experienceFields, setExperienceFields, index, "duration", e.target.value)}
            />
            <textarea
              className="resume-form__textarea"
              placeholder="Description"
              value={field.description}
              onChange={(e) => updateField(experienceFields, setExperienceFields, index, "description", e.target.value)}
            />
            {index > 0 && (
              <button
                type="button"
                className="resume-form__button resume-form__button--remove"
                onClick={() => removeField(experienceFields, setExperienceFields, index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="resume-form__button resume-form__button--add"
          onClick={() => addField(experienceFields, setExperienceFields, { title: "", company: "", duration: "", description: "" })}
        >
          Add Experience
        </button>
      </div>

      <div className="resume-form__section">
        <h3>Projects</h3>
        {projectFields.map((field, index) => (
          <div key={index} className="resume-form__entry">
            <input
              type="text"
              className="resume-form__input"
              placeholder="Project Name"
              value={field.name}
              onChange={(e) => updateField(projectFields, setProjectFields, index, "name", e.target.value)}
            />
            <textarea
              className="resume-form__textarea"
              placeholder="Description"
              value={field.description}
              onChange={(e) => updateField(projectFields, setProjectFields, index, "description", e.target.value)}
            />
            <input
              type="url"
              className="resume-form__input"
              placeholder="URL"
              value={field.url}
              onChange={(e) => updateField(projectFields, setProjectFields, index, "url", e.target.value)}
            />
            {index > 0 && (
              <button
                type="button"
                className="resume-form__button resume-form__button--remove"
                onClick={() => removeField(projectFields, setProjectFields, index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="resume-form__button resume-form__button--add"
          onClick={() => addField(projectFields, setProjectFields, { name: "", description: "", url: "" })}
        >
          Add Project
        </button>
      </div>

      <div className="resume-form__section">
        <h3>Links</h3>
        {links.map((link, index) => (
          <div key={index} className="resume-form__entry">
            <input
              type="url"
              className="resume-form__input"
              placeholder="URL"
              value={link}
              onChange={(e) => {
                const newLinks = [...links];
                newLinks[index] = e.target.value;
                setLinks(newLinks);
              }}
            />
            {index > 0 && (
              <button
                type="button"
                className="resume-form__button resume-form__button--remove"
                onClick={() => removeField(links, setLinks, index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="resume-form__button resume-form__button--add"
          onClick={() => addField(links, setLinks, "")}
        >
          Add Link
        </button>
      </div>

      <div className="resume-form__section">
        <h3>Skills</h3>
        {skills.map((skill, index) => (
          <div key={index} className="resume-form__entry">
            <input
              type="text"
              className="resume-form__input"
              placeholder="Skill"
              value={skill}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[index] = e.target.value;
                setSkills(newSkills);
              }}
            />
            {index > 0 && (
              <button
                type="button"
                className="resume-form__button resume-form__button--remove"
                onClick={() => removeField(skills, setSkills, index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="resume-form__button resume-form__button--add"
          onClick={() => addField(skills, setSkills, "")}
        >
          Add Skill
        </button>
      </div>

      <button
        type="submit"
        className="resume-form__button resume-form__button--submit"
        disabled={isLoading || aiLoading}
      >
        {isLoading || aiLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}