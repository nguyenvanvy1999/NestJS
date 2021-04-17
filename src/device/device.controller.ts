import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './device.schema';
import {
	ApiBearerAuth,
	ApiTags,
	ApiResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	getSchemaPath,
	ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('device')
@Controller('device')
export class DeviceController {
	constructor(private readonly deviceService: DeviceService) {}

	@Post()
	@ApiCreatedResponse({ description: 'The device has been successfully created.' })
	@ApiInternalServerErrorResponse({ description: 'Server error !' })
	async createDevice(@Body() device: Device): Promise<string> {
		return 'Create success';
	}

	@Get()
	@ApiOkResponse({
		schema: {
			type: 'object',
			properties: {
				data: { $ref: getSchemaPath(Device) },
				count: {
					type: 'number',
				},
			},
		},
	})
	@ApiInternalServerErrorResponse({ description: 'Server error !' })
	async getAllDevice(@Query('user') user: string): Promise<object> {
		const devices = await this.deviceService.getAllDeviceUser(user);
		return { devices: devices, count: devices.length };
	}
}
