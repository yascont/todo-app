import { SyntheticEvent, useState } from "react";

  interface todos{
    task : string,
    id : string,
    clicks : number,
    check : number,
  }


  interface VirtualizeProps {
    itemsCount : number;
    todos : todos[];
    heightOfItem : number;
    renderAnItem : (todo : todos)=> JSX.Element;
    heightOfWindow:number;
  }
  
  const Virtualize = ({itemsCount, todos, heightOfItem, renderAnItem, heightOfWindow }: VirtualizeProps) => {

    const [scrollTop, setScrollTop] = useState(0);
    
    const wholeWindowsHeigh = itemsCount * heightOfItem;
    const start = Math.floor(scrollTop / heightOfItem);
    const end = itemsCount - 1 < Math.floor((scrollTop + heightOfWindow) / heightOfItem)?  itemsCount - 1 :  Math.floor((scrollTop + heightOfWindow) / heightOfItem);

    
      
      const items = [];
      for (let i = start; i <= end; i++) {
        items.push(
          renderAnItem(todos[i])
          );
        }
        const onScroll = (e : SyntheticEvent) => {
          if (e.currentTarget.scrollTop - scrollTop > 30 || e.currentTarget.scrollTop - scrollTop < -30)
            setScrollTop(e.currentTarget.scrollTop)
        };
    
  
    return (
      <div className="scroll" style={{ overflowY: "scroll" }} onScroll={onScroll}>
        <div
          className="inner"
          style={{ position: "relative", height: `${wholeWindowsHeigh}px` }}
        >
          <p style={{height:`${heightOfItem * start}px`}}></p>
          {items}
        </div>
      </div>
    );
}

export default Virtualize;