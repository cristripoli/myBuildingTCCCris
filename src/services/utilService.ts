import { Injectable } from '@angular/core';


@Injectable()
export class UtilService{

	static getEnumString(enumType:any, key:any):string
	{
	    return enumType[enumType[key]];
	}

}
