const srcURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqxF7UQhXDF1j2IFvXSxrbtFzq1xkG2PAT0KtGMgRjYnsBaSkBxX4L-TXx-QwrSpPOn7jLlYJ-pcGq/pub?output=csv";
      console.log("React started!");
const { useEffect } = React
const { useState } = React
    let rows = [];
    function toggleHide(e){
      console.log(e);
      let CL = e.currentTarget.classList;
      if(!CL.contains("hide1")){
        CL.add("hide1");  
      }else{
        CL.remove("hide1");  
      }
      
  }
  const App = (props) => { 
    const [timeline, setTimeline] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

      Papa.parse(srcURL, {download: true, complete: function(results){
        let table = results.data;
        for(let i = 0; i < table[0].length;i = i+2){
          let row = [];
          let emptyCount = 0;
          for(let j = 1; j < table.length;j = j+1){
            if(table[j][i]!=""){
              if(emptyCount){
                 row.push(<td colspan={emptyCount}></td>);
                 emptyCount = 0;
              }
              if(table[j][i+1]!=""){
                let link = "https://strangereons.com/"+table[j][i+1]+".html";
              let img = "https://strangereons.com/img/"+table[j][i+1]+".png";
              let gif = "https://strangereons.com/img/"+table[j][i+1]+".gif";
              row.push(<td><div className="event">{table[j][i]}<br/><a href={link}><img src={img}  onError={(e)=>{e.target.onerror = null;if(e.target.src.includes("png"))e.target.src=gif;else e.target.src="missingFile.png";  }}/></a></div></td>);
              }else{
                  row.push(<td><div className="event">{table[j][i]}</div></td>);
              }
              
            }else{
              emptyCount++;  
            }
            
          }
          rows.push(<tr onDoubleClick={e => toggleHide(e)} style={{"border-color" : table[0][i+1]}}><th  style={{"border-color" : table[0][i+1]}}><h2>{table[0][i]}</h2></th>{row}</tr>);
          console.log(i);
        }
        console.log(rows);
        console.log(results.data);
        setTimeline(results.data);

        setLoading(false);  
      }});
      
    }, []);

    return (
      <div>
      {
          loading ? (
            <div id="loader"> TIMELINE IS LOADING...</div> 
          ) : (
            <table className="noselect">
            <tbody>
            {rows}
            </tbody>  
            </table>  
          )
      }
      </div>
      
    );
  }

  const rootElement = document.getElementById('reactor')
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />)