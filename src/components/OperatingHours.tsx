import React from 'react';
import { OperatingHours as OperatingHoursType } from '../services/vendor.service';

interface OperatingHoursProps {
  hours: OperatingHoursType[];
}

export const OperatingHours: React.FC<OperatingHoursProps> = ({ hours }) => {
  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const sortedHours = [...hours].sort((a, b) => 
    daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day)
  );

  return (
    <div className="space-y-2">
      {sortedHours.map((hour) => (
        <div key={hour.day} className="flex justify-between items-center py-1">
          <span className="font-medium w-32">{hour.day}</span>
          <span className="text-gray-600">
            {hour.isClosed ? (
              'Closed'
            ) : (
              `${hour.open} - ${hour.close}`
            )}
          </span>
        </div>
      ))}
    </div>
  );
}; 