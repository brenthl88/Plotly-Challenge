d3.json("../samples.json").then(function(data) {  
  // drop down menu
    var selectData = d3.select("#selDataset");
    

    data.names.forEach(function(name){
      selectData.append("option").property("value", name).text(name)

    })

  d3.select("#selDataset").on("change", function(d) {
  metaData(d);
  bubbleChart(d);
  barChart(d);
});



 // Demographics
  function metaData(){
    var name = d3.select("#selDataset").property("value");
    console.log(name);
    data.metadata.forEach(function(d){
      if(name ==  d.id){
        d3.select("#sample-metadata").html("");
        Object.entries(d).forEach(function([key, value]){
        console.log(key, value);
        d3.select("#sample-metadata").append("p").text([`${key} : ${value}`]);
  });
  
  }})};
  metaData();

 
  function bubbleChart(){
    var name2 = d3.select("#selDataset").property("value");
   data.samples.forEach(function(sample){
      if(sample.id == name2){
        var sample_values = sample.sample_values.slice(0, 10).reverse();
        var otu_ids = sample.otu_ids.slice(0, 10).reverse();
        var otu_labels = sample.otu_labels.slice(0, 10).reverse();
        var find1 = {
        x: otu_ids, 
        y: sample_values,
        mode: 'markers',
        text : otu_labels, 
        marker: {
          color: otu_ids,
          size:sample_values
        }
        };
        var data = [find1];
        var chart1 = {
        title: 'Bubble Chart',
        height: 600,
        width: 600,
        xaxis: {title: "OTU ID"}
        };
        Plotly.newPlot('bubble', data, chart1);
      };
    });
  }
  bubbleChart();

// bar chart
function barChart(){
  var name = d3.select("#selDataset").property("value");
  data.samples.forEach(function(sample){
    if(sample.id == name){
      var sample_values = sample.sample_values.slice(0, 10).reverse();
      var otu_ids = sample.otu_ids.slice(0, 10).reverse();
      var maps = otu_ids.map(x => 'OTU '+ x);
      var otu_labels = sample.otu_labels.slice(0, 10).reverse();
      var draw = {
        x:sample_values,
        y:maps,
        orientation:'h',
        text: otu_labels,    
        type:'bar'
        };
      var data = [draw];
      var design = {
        title: 'Horizontal BarChart with Top 10 OTUs',
        width: 600,
        height: 600
      };
      Plotly.newPlot('bar', data, design);
    };
  });
};

barChart();


})



