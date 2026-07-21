const useGetCalendarDays = () => {
    
   const getCalendarDays = (date: Date) => {
     const year = date.getFullYear();
     const month = date.getMonth();
   
     const firstDay = new Date(year, month, 1);
     const lastDay = new Date(year, month + 1, 0);
   
     const startDay = firstDay.getDay();
     const totalDays = lastDay.getDate();
     const prevMonthLastDay = new Date(year, month, 0).getDate();
   
     const days: {
       day: number;
       date: Date;
       currentMonth: boolean;
     }[] = [];
   
     for (let i = startDay - 1; i >= 0; i--) {
       days.push({
         day: prevMonthLastDay - i,
         date: new Date(year, month - 1, prevMonthLastDay - i),
         currentMonth: false,
       });
     }
   
     for (let day = 1; day <= totalDays; day++) {
       days.push({
         day,
         date: new Date(year, month, day),
         currentMonth: true,
       });
     }
   
     const remainingDays = 42 - days.length;
   
     for (let day = 1; day <= remainingDays; day++) {
       days.push({
         day,
         date: new Date(year, month + 1, day),
         currentMonth: false,
       });
     }
   
     return days;
   };

    return {getCalendarDays}
}

export default useGetCalendarDays