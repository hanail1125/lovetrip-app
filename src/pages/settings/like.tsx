import FixedBottomButton from '@components/shared/FixedBottomButton';
import {Like} from '@models/like';
import useEditLike from '@components/setting/like/hooks/useEditLike';
import ListRow from '@shared/ListRow';
import {css} from '@emotion/react';
import {useEffect, useState} from 'react';
import {
   DragDropContext,
   Droppable,
   DroppableProps,
   Draggable,
   DropResult,
} from 'react-beautiful-dnd';
import {Virtuoso} from 'react-virtuoso';

function generateMocks() {
   const mocks = [];

   for (let i = 0; i < 1000; i += 1) {
      mocks.push({
         id: `${i}`,
         hotelId: `hotel ${i}`,
         hotelName: `hotelName ${i}`,
         hotelMainImageUrl: `hotelMainImageUrl ${i}`,
         userId: '',
         order: i
      } as Like);
   }

   return mocks;
}

function LikePage() {
   const {data, isEdit, reOrder, save} = useEditLike();

   const handleDragEndDrop = (result: DropResult) => {
      if (result.destination == null) {
         return;
      }
      console.log('result ===> : ', result);
      const from = result.source.index;
      const to = result.destination.index;

      reOrder(from, to);
   };

   const mocks = generateMocks();

   return (
      <div css={pageStyles}>
         <header css={headerStyles}>
            <p css={eyebrowStyles}>Wishlist</p>
            <h1 css={titleStyles}>찜하기</h1>
            <p css={subTitleStyles}>찜한 호텔을 길게 눌러 순서를 바꿀 수 있습니다</p>
         </header>
         <DragDropContext onDragEnd={handleDragEndDrop}>
            <StrictModeDroppable droppableId="likes">
               {(droppableProps) => (
                  <ul
                     ref={droppableProps.innerRef}
                     {...droppableProps.droppableProps}
                     css={listStyles}
                  >
                     <Virtuoso
                        useWindowScroll
                        increaseViewportBy={0}
                        itemContent={(index, like) => {
                           return (
                              <Draggable key={index} draggableId={like.id} index={index}>
                                 {(draggableProps) => (
                                    <li
                                       ref={draggableProps.innerRef}
                                       {...draggableProps.draggableProps}
                                       {...draggableProps.dragHandleProps}
                                       css={itemStyles}
                                    >
                                       <ListRow
                                          as="div"
                                          style={rowStyles}
                                          contents={
                                             <ListRow.Texts
                                                title={like.order}
                                                subTitle={like.hotelName}
                                             />
                                          }
                                       />
                                    </li>
                                 )}
                              </Draggable>
                           );
                        }}
                        data={mocks}
                     />
                  </ul>
               )}
            </StrictModeDroppable>
         </DragDropContext>
         {isEdit ? <FixedBottomButton label="저장하기" onClick={save} /> : null}
      </div>
   );
}

function StrictModeDroppable({children, ...props}: DroppableProps) {
   const [enabled, setEnabled] = useState(false);

   useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));

      return () => {
         cancelAnimationFrame(animation);
         setEnabled(false);
      };
   }, []);

   if (enabled === false) {
      return null;
   }

   return <Droppable {...props}>{children}</Droppable>;
}

const pageStyles = css`
   min-height: calc(100vh - 65px);
   background: linear-gradient(180deg, #f7f3ee 0%, #fbfaf8 180px, #ffffff 100%);
`;

const headerStyles = css`
   padding: 32px 24px 12px;
   max-width: 720px;
   margin: 0 auto;
`;

const eyebrowStyles = css`
   margin: 0 0 10px;
   font-size: 12px;
   letter-spacing: 0.18em;
   text-transform: uppercase;
   color: #9a6b4f;
   font-weight: 600;
`;

const titleStyles = css`
   margin: 0;
   font-size: 30px;
   line-height: 1.25;
   font-weight: 800;
   letter-spacing: -0.04em;
   color: #1c1917;
`;

const subTitleStyles = css`
   margin: 10px 0 0;
   font-size: 15px;
   line-height: 1.55;
   color: rgba(28, 25, 23, 0.62);
`;

const listStyles = css`
   max-width: 720px;
   margin: 0 auto;
   padding: 8px 16px 96px;
`;

const itemStyles = css`
   padding-bottom: 10px;
`;

const rowStyles = css`
   padding: 16px 18px;
   background: #ffffff;
   border-radius: 20px;
   box-shadow: 0 10px 28px rgba(28, 25, 23, 0.05);
`;

export default LikePage;
