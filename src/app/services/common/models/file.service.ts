import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { firstValueFrom, Observable } from "rxjs";
import { BaseUrl } from "src/app/contracts/base_url";

@Injectable({
    providedIn: 'root'
})
export class FileService {
    constructor(private httpClintService: HttpClientService) {}

    async getBaseStorageUrl() : Promise<BaseUrl> {
        const getObservable: Observable<BaseUrl> = this.httpClintService.get<BaseUrl>({
            controller: "files",
            action: "GetBaseStorageUrl"
        })
        return await firstValueFrom(getObservable);
    }

 
}