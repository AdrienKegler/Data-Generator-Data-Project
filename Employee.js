class Employee {
    constructor(employeeTeam, employeeID = null){

        this.employeeTeam = employeeTeam;

        if(employeeID!= null){
            this.employeeID = employeeID;
        }
    }
}

module.exports = Employee;
