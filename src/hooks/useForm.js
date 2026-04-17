import { useState } from 'react'

export default function useForm(initialValues, validate) {

    const [values, setValues]   = useState(initialValues)
    const [errors, setErrors]   = useState({})
    const [touched, setTouched] = useState({})

    // handle change event
    function handleChange(event) {
        const { name, value } = event.target
        setValues(prev => ({ ...prev, [name]: value }))
        // only re-validate if user already touched this field
        if (touched[name]) {
            const errs = validate({ ...values, [name]: value })
            setErrors(prev => ({ ...prev, [name]: errs[name] }))
        }
    }

    // handle blur event
    function handleBlur(event) {
        const { name } = event.target
        setTouched(prev => ({ ...prev, [name]: true }))
        const errs = validate(values)
        setErrors(prev => ({ ...prev, [name]: errs[name] }))
    }


    // validate all fields
   function validateAll() {
    const errs = validate(values)
    setErrors(errs)
    setTouched(Object.keys(initialValues).reduce((acc, k) => ({ ...acc, [k]: true }), {}))
    return errs 

    }

    // reset form
    function reset() {
        setValues(initialValues)
        setErrors({})
        setTouched({})
    }

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateAll,
        reset,
        setValues    
    }
}