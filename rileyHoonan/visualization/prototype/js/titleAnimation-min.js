function starterAnimation(){setTimeout(function(){var t=document.createEvent("HTMLEvents");t.initEvent("click",!0,!1),document.getElementById(ids[c]).dispatchEvent(t),console.log("starter animation running "+c),c++,c>=ids.length-1&&(c=0),noClicks&&starterAnimation()},4e3)}function replaceTitle(t){function e(){setTimeout(function(){c?n=n.slice(0,-1):(n=o.slice(0,l),l++),d3.select("span#nodeTitle").text(n),n.length<=0?(e(),console.log("subtracting")):c=!1,!c&&l<=o.length&&(e(),console.log("not subtracting"))},i)}console.log("replaceTitle");var n=d3.select("span#nodeTitle").text(),o=t.value.title,i=125,l=0,c=!0;if(d3.select("h1#dynamic").style("width",function(){return 20+Math.floor(o.length/2)+"%"}),n=n.split("(")[0],n.split(" ").length>4){var s=n.split(" ");n=s[0]+" "+s[1]+" "+s[2]+" "+s[3]}console.log("new text: "+o),e()}var ids=["Thomas_Pynchon","George_Orwell","Stanley_Kubrick","Fyodor Dostoyevsky"],c=0,noClicks=!0;