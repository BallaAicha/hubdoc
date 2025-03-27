import React from 'react';
import { motion } from 'framer-motion';
import { APIService } from '../../types/api';
import ServiceHeader from "./container/ServiceHeader.tsx";
import ServiceClients from "./container/ServiceClients.tsx";
import ServiceDataSources from './container/ServiceDataSourcesProps.tsx';
import ServiceInfrastructure from "./container/ServiceInfrastructure.tsx";
import ServiceDependencies from "./container/ServiceDependencies.tsx";
import ServiceEndpoints from "./container/ServiceEndpoints.tsx";
import ServiceDatabaseSchema from "./container/ServiceDatabaseSchema.tsx";


interface ServiceDocumentationContainerProps {
    service: APIService;
}

export function ServiceDocumentationContainer({ service }: ServiceDocumentationContainerProps) {
    return (
        <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ServiceHeader service={service} />
            <ServiceInfrastructure infrastructure={service.infrastructure} />
            <ServiceClients clients={service.clientConsumers} />
            <ServiceDataSources dataSources={service.dataSources} />
            <ServiceDependencies consumes={service.consumes} consumedBy={service.consumedBy} />
            <ServiceEndpoints endpoints={service.endpoints} />
            {service.databaseSchema && <ServiceDatabaseSchema schemaUrl={service.databaseSchema} />}
        </motion.div>
    );
}

export default ServiceDocumentationContainer;