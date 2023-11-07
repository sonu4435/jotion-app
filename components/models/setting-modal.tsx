"use client";

import { Dialog, DialogHeader, DialogContent } from '../ui/dialog'
import { UseSetting } from '@/hooks/use-settings';
import { Label } from '../ui/label';
import { ModeToggle } from '../mode-toggle';

export const SettingsModal = () => {
    const settings = UseSetting();

    return(
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
                <DialogHeader className='border-b pb-3'>
                    <h2 className='text-lg font-medium'>My Settings</h2>
                </DialogHeader>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-1'>
                        <Label>
                            Apperance
                        </Label>
                        <span className='text-[0.8rem] text-muted-foreground'>
                            Coustomize how Jotion looks on your Device
                        </span>
                    </div>
                <ModeToggle/>
                </div>
            </DialogContent>
        </Dialog>
    )
}