function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var resultsArray = samples.filter(obj => obj.id == sample);
      console.log(resultsArray)
      //  5. Create a variable that holds the first sample in the array.
      var result = resultsArray[0];
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otuIDs = result.otu_ids;
      var otuLabs = result.otu_labels;
      var sampleVals = result.sample_values;
  
      // Create a variable that holds the samples array. 
      var metadata = data.metadata;      
      // Create a variable that filters the samples for the object with the desired sample number.
      var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
      // 1. Create a variable that filters the metadata array for the object with the desired sample number.
  
      // Create a variable that holds the first sample in the array.
      
  
      // 2. Create a variable that holds the first sample in the metadata array.
      var metaResult = metadataArray[0];
  
      // Create variables that hold the otu_ids, otu_labels, and sample_values.
      
  
      // 3. Create a variable that holds the washing frequency.
      var washingFreq = parseInt(metaResult.wfreq);
      
      // 4. Create the trace for the gauge chart.
      var gaugeData = [{
        value: washingFreq,
        title: {text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", title_font_size: 1},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {range: [0, 10], dtick: 2},
          bar: {color: "black"},
          steps: [
              {range: [0,2], color:"red"},
              {range: [2,4], color:"orange"},
              {range: [4,6], color:"yellow"},
              {range: [6,8], color:"yellowgreen"},
              {range: [8,10], color:"green"},
          ]
        },
      },
      ];
      
      // 5. Create the layout for the gauge chart.
      var gaugeLayout = { 
        width: 940, height: 500, margin: {t: 0, b: 0}
      };
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    });
  }
  