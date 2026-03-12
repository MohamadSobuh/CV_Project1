import React from 'react'

const InputError = ({ error }) => {
    if (!error) return null;
    return (
        <p style={{ color: "red" }}>{error.message}</p>

    )
}

export default InputError