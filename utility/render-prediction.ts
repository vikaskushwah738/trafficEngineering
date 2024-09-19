export const renderPredictions = (predictions: any[], ctx: CanvasRenderingContext2D) => {
    // Clear the previous frame
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
    // Set font properties for labels
    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
  
    // Loop through each prediction and draw
    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox; // Get bounding box
  
      const isPerson = prediction.class === "person";
  
      // Set stroke color based on whether the object is a person or not
      ctx.strokeStyle = isPerson ? "#FF0000" : "#FFFF00";
      ctx.lineWidth = 4;
  
      // Draw the bounding box
      ctx.strokeRect(x, y, width, height);
  
      // Set fill style with transparency if it's a person
      ctx.fillStyle = `rgba(255, 0, 0, ${isPerson ? 0.2 : 0})`;
  
      // Fill the bounding box
      ctx.fillRect(x, y, width, height);
    });
  };
  