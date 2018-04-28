class Student {
    constructor(name, age, subject) {
        this.name = name;
        this.age = age;
        this.subject = subject;
    }
}

// This function generates the JSON schema for the given Student class instance
// with this design, no need to iterate every filed of the UI
function generateSchema(student) {
    //if we have one or more fields not null or empty we generate JSON schema
    if (student.name || student.age || student.subject) {
        //Start { of the schema
        let schema = "{\n";
        //iterate through the properties of Student class and generate schema for all non-empty and not null feils
        for (prop in student) {
            let studentProp = String(student[prop]);
            if (studentProp !== "" && studentProp !== 'null')
                schema = schema + '"' + String(prop) + ': ' + studentProp + '",' + '\n';
        }
        //removing additional comma at the end of the schema and adding end }
        schema = schema.substring(0, schema.length - 2) + '\n}';
        return schema;
    }
    //if we have all fields empty or null we return empty string - this removes { and }
    return "";
}

// Listen keyup event of each field and call generateSchema function providing current Student class instance
$(document).ready(function () {
    //starting with a Student instance with no values
    currentStudent = new Student(null, null, null);
    $("#inName").keyup(function ({}) {
        currentStudent.name = this.value;
        $("#txtResult").val(generateSchema(currentStudent));
    });
    $("#inAge").keyup(function ({}) {
        currentStudent.age = this.value;
        $("#txtResult").val(generateSchema(currentStudent));
    });
    $("#inSub").keyup(function ({}) {
        currentStudent.subject = this.value;
        $("#txtResult").val(generateSchema(currentStudent));
    });
});