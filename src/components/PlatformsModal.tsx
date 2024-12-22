import {List} from '@mui/material';
import {RootState} from "../app/store.ts";
import {useState} from "react";
import {useUpdateUserPlatformsMutation} from "../features/api/userApi.ts";
import PreferencesModal from "./PreferencesModal.tsx";
import {useFetchPlatformsQuery} from "../features/api/preferencesApi.ts";
import {useDispatch, useSelector} from "react-redux";
import {setPlatforms} from "../features/user/userPreferencesSlice.ts";
import PreferenceModalItem from "./PreferenceModalItem.tsx";
import ErrorPageLoading from "./errors/ErrorPageLoading.tsx";
import LoadingPage from "./LoadingPage.tsx";
import {toast} from "sonner";

type GenresModalProps = {
  open: boolean;
  onClose: () => void;
};

function PlatformsModal({open, onClose}: GenresModalProps) {
  const userPlatforms = useSelector((state: RootState) => state.userPreferences.platforms);
  const userCountryCode = useSelector((state: RootState) => state.user.country.countryCode);
  const dispatch = useDispatch();

  const [updateUserPlatforms, {
    isLoading: updateIsLoading,
    isSuccess: updateSuccess
  }] = useUpdateUserPlatformsMutation();

  const {data: allPlatforms, isError, isLoading} = useFetchPlatformsQuery(userCountryCode);

  const [platformsSelected, setPlatformsSelected] = useState(userPlatforms);

  const handleToggle = (platform: { id: number, name: string }, isSelected: boolean) => {
      if (isSelected) {
        setPlatformsSelected([...platformsSelected, {platformId: platform.id, platformName: platform.name}]);
      } else {
        const updatedPlatforms = platformsSelected.filter((p) => p.platformId !== platform.id);
        setPlatformsSelected(updatedPlatforms);
      }
    }
  ;

  const handleSave = async () => {
    const platformsId = platformsSelected.map((platform) => platform.platformId);
    await updateUserPlatforms(platformsId);
  };

  const checkSelected = (platformId: number) => {
    return platformsSelected.some((platform) => platform.platformId === platformId);
  }

  if (isLoading) {
    return <LoadingPage/>
  }

  if (isError) {
    return <ErrorPageLoading message={'Failed to load platforms'}/>
  }

  if (updateSuccess) {
    dispatch(setPlatforms(platformsSelected))
    toast.success('Platforms updated successfully');
    onClose();
  }
  const title = 'Manage your Platforms';
  const description = 'Select the platforms you own to get better recommendations';

  return (
    <PreferencesModal
      open={open}
      onClose={onClose}
      isLoading={updateIsLoading}
      handleSave={handleSave}
      title={title}
      description={description}
    >
      <List>
        {allPlatforms?.map(({platformName, platformId}) => (
          <PreferenceModalItem
            key={platformId}
            id={platformId}
            name={platformName}
            checkSelected={checkSelected}
            handleToggle={handleToggle}
          />
        ))}
      </List>
    </PreferencesModal>
  );
}

export default PlatformsModal;
