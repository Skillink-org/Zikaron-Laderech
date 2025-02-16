'use client';

import React, { createContext, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';

const FallenContext = createContext();

export const FallenProvider = ({ children, initialHobbies }) => {
    const { data: session } = useSession();
    const [hobbies, setHobbies] = useState(initialHobbies);
    const uniqueContinuers = new Set(
        hobbies
            .map((hobby) => hobby.continuers)
            .flat()
    );
    const [totalContinuers, setTotalContinuers] = useState(uniqueContinuers.size);

    const updateHobby = (hobbyName) => {
        setHobbies(prevHobbies =>
            prevHobbies.map(hobby =>
                hobby.name === hobbyName
                    ? { ...hobby, continueCount: hobby.continueCount + 1 }
                    : hobby
            )
        );
        uniqueContinuers.add(session.user.id)
        setTotalContinuers(uniqueContinuers.size);
    };

    return (
        <FallenContext.Provider value={{ hobbies, totalContinuers, updateHobby, uniqueContinuers }}>
            {children}
        </FallenContext.Provider>
    );
};

export const useFallen = () => useContext(FallenContext);