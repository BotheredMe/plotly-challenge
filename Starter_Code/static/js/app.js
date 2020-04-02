function getPlots(id) {
    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_idss;
        console.log(ids)
        var sample_values =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sample_values)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)

        function getDemoInfo(id) {
            d3.json("samples.json").then((data)=> {
                var metadata = data.metadata;
                console.log(metadata)
        
                //id filter
                var result = metadata.filter(meta => meta.id.toString() === id)[0];
                var demographicInfo = d3.select("#sample-metadata");
                demographicInfo.html("");
                Object.entries(result).forEach((key) => {   
                    demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
                });
            });
        }
        function optionChanged(id) {
            getPlots(id);
            getDemoInfo(id);
        }
        function init() {
            var dropdown = d3.select("#selDataset");
            d3.json("samples.json").then((data)=> {
                console.log(data)
                data.names.forEach(function(name) {
                    dropdown.append("option").text(name).property("value");
                });
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
        }

    //top ten otu
        var OTU_top = ( sampledata.samples[0].otu_idss.slice(0, 10)).reverse();
        var otu_ids = OTU_top.map(d => "OTU " + d);
        console.log(`OTU IDS: ${otu_ids}`)
        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`otu_labels: ${labels}`)
        var trace = {
            x: otu_ids,
            y: sample_values,
            text: labels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        var data = [trace];
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

    Plotly.newPlot("bar", data, layout);
    
        var trace1 = {
            x: sampledata.samples[0].otu_idss,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_idss
            },
            text:  sampledata.samples[0].otu_labels
        };
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
        var data1 = [trace1];
        Plotly.newPlot("bubble", data1, layout_2); 
    });
}  





init();