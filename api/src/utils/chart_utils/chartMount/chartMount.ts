import Metric from "../metric/metric";
import Options from "../options/options";

export default function chartMount(metrics: Array<Metric>){
    var opts = new Options("",[])
    metrics.forEach(metrica => {
        opts.addSerie(metrica)
    }); 
    return opts
}