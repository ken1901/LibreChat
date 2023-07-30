import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { SaveAsPresetDialog, EndpointOptionsPopover } from '~/components/Endpoints';
import Settings from './Settings';
import { ModelSelect } from './ModelSelect';
import { Button } from '~/components/ui';
import { cn } from '~/utils/';
import { SetOption } from 'librechat-data-provider';
import store from '~/store';

function OptionsBar() {
  const [advancedMode, setAdvancedMode] = useState<Boolean>(false);
  const [saveAsDialogShow, setSaveAsDialogShow] = useState<Boolean>(false);
  const [conversation, setConversation] = useRecoilState(store.conversation) || {};
  const triggerAdvancedMode = () => setAdvancedMode((prev) => !prev);

  const switchToSimpleMode = () => {
    setAdvancedMode(false);
  };

  const saveAsPreset = () => {
    setSaveAsDialogShow(true);
  };

  const setOption: SetOption = (param) => (newValue) => {
    let update = {};
    update[param] = newValue;
    setConversation((prevState: any = {}) => ({
      ...prevState,
      ...update,
    }));
  };

  const cardStyle =
    'transition-colors shadow-md rounded-md min-w-[75px] font-normal bg-white border-black/10 hover:border-black/10 focus:border-black/10 dark:border-black/10 dark:hover:border-black/10 dark:focus:border-black/10 border dark:bg-gray-700 text-black dark:text-white';

  return (
    <>
      <div
        className={
          'openAIOptions-simple-container flex w-full flex-wrap items-center justify-center gap-2' +
          (!advancedMode ? ' show' : '')
        }
      >
        <ModelSelect conversation={conversation} setOption={setOption} />
        <Button
          type="button"
          className={cn(
            cardStyle,
            'min-w-4 z-50 flex h-[40px] flex-none items-center justify-center px-4 hover:bg-slate-50 focus:ring-0 focus:ring-offset-0 dark:hover:bg-gray-600',
          )}
          onClick={triggerAdvancedMode}
        >
          <Settings2 className="w-4 text-gray-600 dark:text-white" />
        </Button>
      </div>
      <EndpointOptionsPopover
        visible={advancedMode}
        saveAsPreset={saveAsPreset}
        switchToSimpleMode={switchToSimpleMode}
      >
        <div className="px-4 py-4">
          <Settings conversation={conversation} setOption={setOption} />
        </div>
      </EndpointOptionsPopover>
      <SaveAsPresetDialog
        open={saveAsDialogShow}
        onOpenChange={setSaveAsDialogShow}
        preset={conversation}
      />
    </>
  );
}

export default OptionsBar;
