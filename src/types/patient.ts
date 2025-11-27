export interface Patient {
    id: number;
    name: string;
    image: string;
    gender: string;
    age: number;
    contact: {
        phone: string;
        email: string;
    };
    lastAppointment: string;
    upcomingAppointment: string;
    consultationNotes: {
        title: string;
        description: string;
        date: string;
    }[];
}

export type PatientTab = 'all' | 'active' | 'pending' | 'past';
