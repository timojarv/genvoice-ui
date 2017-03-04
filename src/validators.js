const _required = value => value ? undefined : true;

export const required = fields => {
    //Field-level validator
    if(typeof fields !== "object") return _required(fields);
    
    //Form-level validator
    return formFields => {
        //console.log(formFields);
        let errors = {};
        fields.map(field => {
            if(!formFields[field]) errors[field] = "Required";
        });
        return errors;
    };
};