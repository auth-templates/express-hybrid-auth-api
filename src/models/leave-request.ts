export interface LeaveRequest {
    id: number;
    userId: number;
    leaveTypeId: number;
    startDate: Date;
    endDate: Date;
    status: LeaveStatus;
    reason?: string;
    createdAt: Date;
  }
  
export type CreateLeaveRequestInput = Omit<LeaveRequest, 'id' | 'createdAt' | 'status'>;

export type LeaveStatus = 'pending' | 'approved' | 'rejected';