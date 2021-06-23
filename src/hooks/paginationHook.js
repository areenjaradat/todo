import { useContext } from 'react';
import { SiteContext } from '../context/site';

const usePagination = (action) => {

  const context = useContext(SiteContext);
  // console.log(context.pages);
  const dataLimit = 5 ;
  
  function goToNextPage() {
    context.setCurrentPage(context.currentPage + 1);
  }

  function goToPreviousPage() {
    context.setCurrentPage(context.currentPage - 1);
  }

  function changePage(value) {
    // console.log('inside changePage;', value);
    context.setCurrentPage(value);
  }

  const getPaginatedData = (data) => {
    // console.log('inside paginatedData:', data);
   // console.log('context.currentPage',context.currentPage)
    const startIndex = context.currentPage * dataLimit - dataLimit;
    //console.log('startIndex',startIndex)
    const endIndex = startIndex + dataLimit;
    // console.log(data.slice(startIndex, endIndex));
    context.setPages(Math.ceil(data.length / 5));
    //console.log('data.slice(startIndex, endIndex)',data.slice(startIndex, endIndex))
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((context.currentPage - 1) / dataLimit) * dataLimit;

    //console.log('start',start);

    let arr=new Array(context.pages).fill();

   // console.log('fill array',arr);
    let arr2=arr.map((data, idx) => start + idx + 1);
    //console.log('map array',arr2);
    return arr2;
  }; 

  return [
    goToNextPage,
    goToPreviousPage,
    changePage,
    getPaginatedData,
    getPaginationGroup
  ]
}

export default usePagination;