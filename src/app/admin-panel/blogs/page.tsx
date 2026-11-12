import Test from '@/module/test';
import React from 'react';

const page = () => {
    return (
        <div className="p-5 md:p-8">
            <h1 className="mb-6 text-xl font-extrabold md:text-2xl">مقاله‌ها</h1>
            <div className="field min-h-48">
                <Test />
            </div>
        </div>
    );
};

export default page;
