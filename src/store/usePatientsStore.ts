import { create } from 'zustand';
import { Patient } from '../types/patient';

interface PatientsState {
    patients: Patient[];
    isLoading: boolean;
    error: string | null;
    fetchPatients: () => Promise<void>;
}

const API_URL = 'https://tact-medic-api.onrender.com';

export const usePatientsStore = create<PatientsState>((set) => ({
    patients: [],
    isLoading: false,
    error: null,

    fetchPatients: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${API_URL}/patients`);
            if (!response.ok) {
                throw new Error('Failed to fetch patients');
            }
            const data = await response.json();
            set({ patients: data, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Unknown error',
                isLoading: false
            });
        }
    },
}));
