export interface IOpenModal {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
    isOpen: boolean;

}

export interface IFormInputs {
    nameGraph: string;
    initial: number;
    last: number;
    nameProject: string;
    email:string,
    password:string,
    constructiveName:string,
    companyName:string,
    major:string,
    firstName:string,
    lastName:string
    
}
 export interface  IMaterial {
    id:number,
    done: number,
    doneOnDay:number,
    doneOnYear: number,
    planOnYear: number,
    project: number,
    type:string,
    unit: string,
 }

 export  interface IGraphic {
    [key:string] : {
        [key:string] : {
            isDones: boolean, 
            name: string,
             num: number
        }[]
    }[]
 }

 export interface IConstructive {
	id: string;
	constructive: string;
	projectLeft: number | null;
	projectRight: number | null;
	doneLeft: number | null;
	doneRight: number | null;
	restRight: number | null;
	restLeft: number | null;
	frontLeft: number | null;
	frontRight: number | null;
	project: number | null;
	done: number | null;
	rest: number | null;
	front: number | null;
	type: string;
}