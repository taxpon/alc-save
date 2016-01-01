export = Env;
class Env {
    public static eventName: string = "AlcSaveChromeEvent";
    public static DEBUG: boolean = false;
    static log(msg: any) {
        if(Env.DEBUG) console.log(msg);
    }
}