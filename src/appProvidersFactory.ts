import { Options, buildDataProvider } from '@ra-data-prisma/dataprovider';
import { useEffect, useState } from 'react';

import { CREATE } from 'react-admin';
import withAuthProvider from './authProvider';

export const appProvidersFactory = () => {
  return (options: Options) => {
    const [dataProvider, setDataProvider] = useState<any>();
    const authProvider = withAuthProvider();

    useEffect(() => {
      buildDataProvider(options)
        .then((p) => {
          setDataProvider(() => p);
        })

        .catch((e) => {
          console.error(e);
        });
    }, []);

    const getDataProvider = (type: string, resource: string, params: any) => {
      if (!dataProvider) return false;

      if (type === CREATE && resource === 'VehicleEquipment') {
        return dataProvider(type, resource, {
          data: {
            equipmentType: params.data.equipmentTypeId,
            vehicle: params.data.vehicleId,
          },
        });
      }

      return dataProvider(type, resource, params);
    };

    return {
      dataProvider: dataProvider && getDataProvider,
      authProvider,
    };
  };
};
