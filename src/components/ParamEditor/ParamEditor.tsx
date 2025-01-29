import { FC } from 'react'
import './ParamEditor.css'
import { useFieldArray, useForm } from 'react-hook-form';

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  // colors: Color[];
}

interface Props {
  params: Param[];
  model: Model
}

export const ParamEditor: FC<Props> = ({ params, model }) => {
  const {
    register,
    handleSubmit,
    control,
  } = useForm<Model>({
    defaultValues: {
      paramValues: model.paramValues
    }
  });

  const { fields } = useFieldArray({
    control,
    name: 'paramValues',
  });

  const onSubmitModel = (data: Model) => {
    console.log('Model', data);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmitModel)}
      className="root"
    >
      <h1>Редактор параметров</h1>
      <div className="paramsContainer">
        {fields.map((field, index) => {
          const param = params.find(param => param.id == field.paramId)
          return(
            <div className="param">
              <label>{param?.name}</label>
              {param?.type == 'string' && (
                <input
                  type="text"
                  {...register(`paramValues.${index}.value`)}
                  defaultValue={field?.value}
                />
              )}
              {/* Другие типы */}
            </div>
          ) 
        })}
      </div>
      <button 
        type="submit" 
        className="submitBtn"
      >
        Редактировать
      </button>
    </form>
  )
}