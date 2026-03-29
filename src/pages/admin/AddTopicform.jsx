import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import style from "./AddTopics.module.css";
import AdminInput from "../../components/ui/AdminInput";
import InputError from "../../components/ui/InputError";
import { topicSchema } from "../../utils/validationSchema";

const AddTopicform = ({ formData = null, onClose, handleEdit, handleAdd, t }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(topicSchema)
    });

    useEffect(() => {
        if (formData?.id) {
            reset(formData);
        } else {
            reset();
        }
    }, [formData?.id, reset]);

    const onFormSubmit = (data) => {
        if (formData?.id) {
            handleEdit({ ...data, id: formData.id });
        } else {
            handleAdd(data);
        }
    };
    console.log("Form Errors:", errors);

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <div className={style.modalOverlay} onClick={handleClose}>
            <div className={style.modalContent} onClick={e => e.stopPropagation()}>
                <h2 className={style.modalTitle}>
                    {formData?.id ? t.editTopic || "Edit Topic" : t.addNewTopic || "Add Topic"}
                </h2>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="mb-4">
                        <label className={style.labelStyle}>{t.topicTitleLabel}</label>
                        <AdminInput
                            registerProps={register("title")}
                            placeholder={t.topicPlaceholder}
                        />
                        <InputError error={errors.title} />
                    </div>

                    <div className="mb-4">
                        <label className={style.labelStyle}>{t.description}</label>
                        <textarea
                            {...register("desc")}
                            className={style.textareaStyle}
                            rows="4"
                        />
                        <InputError error={errors.desc} />
                    </div>

                    <div className="mb-4">
                        <label className={style.labelStyle}>{t.careerFieldLabel}</label>
                        <select {...register("category")} className={style.selectStyle}>
                            <option value="">{t.selectField || "Select Field"}</option>
                            <option value="Front-end Development">Front-end Development</option>
                            <option value="Backend Development">Backend Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                        </select>
                        <InputError error={errors.category} />
                    </div>
                    <div className="mb-4">
                        <label className={style.labelStyle}>{t.difficultyLabel || "Difficulty Level"}</label>
                        <select {...register("difficulty")} className={style.selectStyle}>
                            <option value="">{t.selectDifficulty || "Select Difficulty"}</option>
                            <option value="Easy">{t.easy}</option>
                            <option value="Medium">{t.medium}</option>
                            <option value="Hard">{t.hard}</option>
                        </select>
                        <InputError error={errors.difficulty} />
                    </div>

                    <div className={style.modalButtons}>
                        <button type="button" className={style.btnOutline} onClick={handleClose}>
                            {t.cancel}
                        </button>
                        <button type="submit" className={style.btnActive}>
                            {formData?.id ? t.saveChanges || "Save Changes" : t.addTopic || "Add Topic"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTopicform;