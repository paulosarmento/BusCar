// Tipar isso seria bom, mas para agilizar vou usar 'any' nos hooks

import { CarroDialog } from "@/app/firebase/components/CarroDialog";
import { DestinoDialog } from "@/app/firebase/components/DestinoDialog";
import { ReservaDialog } from "@/app/firebase/components/ReservaDialog";
import { ViagemDialog } from "@/app/firebase/components/ViagemDialog";

// O ideal é criar uma interface para cada Hook
export function DashboardDialogs({
  carrosHook,
  viagensHook,
  reservasHook,
  destinosHook,
  carros,
  destinos,
  getCarroById,
}: any) {
  return (
    <>
      <CarroDialog
        open={carrosHook.isDialogOpen}
        onOpenChange={carrosHook.setIsDialogOpen}
        formData={carrosHook.formData}
        setFormData={carrosHook.setFormData}
        editingCar={!!carrosHook.editingCar}
        isSubmitting={carrosHook.isSubmitting}
        onSubmit={carrosHook.submit}
        onClose={carrosHook.closeDialog}
        handleUploadFoto={carrosHook.handleUploadFoto}
        uploadingFoto={carrosHook.uploadingFoto}
      />

      <ViagemDialog
        open={viagensHook.isDialogOpen}
        onOpenChange={viagensHook.setIsDialogOpen}
        formData={viagensHook.formData}
        setFormData={viagensHook.setFormData}
        carros={carros}
        destinos={destinos}
        editing={!!viagensHook.editingViagem}
        isSubmitting={viagensHook.isSubmitting}
        onSubmit={viagensHook.submit}
        onClose={viagensHook.closeDialog}
      />

      <ReservaDialog
        open={reservasHook.isDialogOpen}
        onOpenChange={reservasHook.setIsDialogOpen}
        viagem={reservasHook.viagemSelecionada}
        getCarroById={getCarroById}
        formData={reservasHook.formData}
        setFormData={reservasHook.setFormData}
        isSubmitting={reservasHook.isSubmitting}
        onSubmit={reservasHook.submit}
        onClose={reservasHook.closeDialog}
        showPayment={reservasHook.showPayment}
        reservaAtual={reservasHook.reservaAtual}
        onPaymentSuccess={() =>
          reservasHook.confirmarPagamento(
            reservasHook.reservaAtual?.id || "",
            reservasHook.reservaAtual?.mercadoPagoOrderId || ""
          )
        }
      />

      <DestinoDialog
        open={destinosHook.isDialogOpen}
        onOpenChange={destinosHook.setIsDialogOpen}
        isSubmitting={destinosHook.isSubmitting}
        onSubmit={destinosHook.submit}
        onClose={destinosHook.closeDialog}
        editing={!!destinosHook.editingDestino}
        formData={destinosHook.formData}
        setFormData={destinosHook.setFormData}
      />
    </>
  );
}
