export default class DataLoader {

    static async loadJSON(url:string): Promise<any> {
        // tip: CMD+CLICK op een type om alle opties te zien
        const myHeaders = new Headers();

        const init:RequestInit = {
            method: "GET",
            headers: myHeaders,
            mode: "cors",
            cache: "default"
        };

        let res = await fetch(url, init)
        return await res.json()
    }
    static async postlp(url:string, data:object): Promise<any> {
        // tip: CMD+CLICK op een type om alle opties te zien
      
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
          });

        const init:RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data),
            mode: "cors",
            cache: "default"
        };

        let res = await fetch(url, init)
        
        console.log(res)

        return res
    }

    // put function
    static async PutLp(url:string, data:object): Promise<any> {

        // tip: CMD+CLICK op een type om alle opties te zien
        const myHeaders = new Headers({
            'Content-Type': 'application/json'
          });
    // Je moet hier de data binnenkrijgen van je form
    const init:RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(data),
        mode: "cors",
        cache: "default"
    };

    let res = await fetch(url, init)

    console.log(res)

    return res
    }
    static async delete(url:string): Promise<any> {

        const init:RequestInit = {
            method: "DELETE",
            mode: "cors",
            cache: "default"
        };

        let res = await fetch(url, init)

        console.log(res)

        return res
    }
    // delete function (geen headers nodig)

    static async loadImage(img: string): Promise<any> {
        let url = `http://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(img)}&api_key=dc6zaTOxFJmzC`
        let res = await fetch(url)
        let json = await res.json()
        return await DataLoader.checkData(json)
    }

    static async checkData(json: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (json.data.length == 0) {
                reject("No gif found!")
            } else {
                let ind:number = Math.floor(Math.random()*json.data.length)
                let gifurl: string = json.data[ind].images.fixed_height.url;
                resolve(gifurl);
            }
        })
    }
}